---
trigger: manual
---

# SOLID — Principles for React / TypeScript

> Applied to a React + TypeScript codebase using FSD architecture.  
> Every rule includes a ❌ bad example and a ✅ correct fix.

---

## S — Single Responsibility Principle

> **One module, one reason to change.**

Every file, component, hook, and store owns exactly **one concern**.  
Split by the axis of change: if two things change for different reasons — they belong in different files.

### Components

```tsx
// ❌ Bad — one component fetches, transforms, and renders
const UserCard = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(r => r.json())
      .then(dto => setUser({ ...dto, name: dto.name.trim().toUpperCase() }));
  }, [id]);
  if (!user) return <Spinner />;
  return <div className="card">{user.name}</div>;
};

// ✅ Good — three separate concerns, three separate files
// entities/user/api/userApi.ts   → fetch + DTO mapping
// entities/user/lib/formatUser.ts → pure transformation
// entities/user/ui/UserCard.tsx  → render only
const UserCard = ({ user }: { user: User }) => (
  <div className={styles.card}>{formatUserName(user)}</div>
);
```

### Hooks

```ts
// ❌ Bad — one hook manages auth state AND tracks analytics
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const login = async (dto: LoginDto) => {
    const u = await authApi.login(dto);
    setUser(u);
    analytics.track('login', { userId: u.id }); // ← unrelated concern
  };
  return { user, login };
};

// ✅ Good — each hook has one job
// useAuthStore.ts  → manages auth state
// useAuthTracking.ts → subscribes to auth events and tracks them
```

### Stores

```ts
// ❌ Bad — user store also handles UI modals
const useUserStore = create(() => ({
  user: null,
  isModalOpen: false,       // ← UI concern in domain store
  toggleModal: () => { ... }
}));

// ✅ Good — modal state lives in the component that owns the modal
const useUserStore = create(() => ({ user: null, setUser: () => {} }));
// const [isModalOpen, setModalOpen] = useState(false); ← in the component
```

---

## O — Open / Closed Principle

> **Open for extension, closed for modification.**

Design components and modules so that new behaviour can be added via **composition** — without editing existing code.

### Slot / render-prop pattern

```tsx
// ❌ Bad — adding a "badge" requires editing ProductCard source
const ProductCard = ({ product }: { product: Product }) => (
  <div>
    <img src={product.image} />
    <h3>{product.name}</h3>
    {product.isNew && <span className="badge">NEW</span>} {/* hardcoded */}
  </div>
);

// ✅ Good — badge slot: callers extend without touching the component
interface ProductCardProps {
  product: Product;
  badge?: ReactNode;      // extension point
  actions?: ReactNode;    // extension point
}
const ProductCard = ({ product, badge, actions }: ProductCardProps) => (
  <div>
    <div className={styles.imageWrap}>
      <img src={product.image} />
      {badge}
    </div>
    <h3>{product.name}</h3>
    {actions}
  </div>
);

// Usage — no modifications to ProductCard needed
<ProductCard
  product={p}
  badge={p.isNew ? <NewBadge /> : undefined}
  actions={<AddToCartButton id={p.id} />}
/>
```

### Strategy pattern for varying behaviour

```ts
// ❌ Bad — switch/if grows every time a new payment type is added
const processPayment = (type: string, amount: number) => {
  if (type === 'card')   return chargeCard(amount);
  if (type === 'crypto') return chargeCrypto(amount);
  // new type → edit this function
};

// ✅ Good — register new strategies, never edit the runner
interface PaymentStrategy { charge(amount: number): Promise<void> }

const strategies: Record<string, PaymentStrategy> = {
  card:   new CardStrategy(),
  crypto: new CryptoStrategy(),
};

const processPayment = (type: string, amount: number) =>
  strategies[type].charge(amount);
// Adding PayPal: just add strategies.paypal = new PayPalStrategy()
```

---

## L — Liskov Substitution Principle

> **Subtypes must be substitutable for their base type without breaking callers.**

All variants of a UI primitive or interface must honour the same contract.

### UI primitives

```ts
// shared/ui/Button/types.ts — base contract
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  isLoading?: boolean;
  leftIcon?: ReactNode;
}

// ✅ IconButton satisfies ButtonProps — no properties removed or narrowed
interface IconButtonProps extends ButtonProps {
  icon: ReactNode;           // adds, never removes
}

// ❌ Bad — breaks contract by removing onClick
interface ReadOnlyButtonProps extends ButtonProps {
  onClick?: never;           // narrows — violates LSP
}
```

### Repository / service pattern

```ts
// shared/api/types.ts
interface UserRepository {
  getById(id: string): Promise<User>;
  save(user: User): Promise<void>;
}

// ✅ Both implementations are drop-in substitutes for each other
class HttpUserRepository implements UserRepository { ... }
class InMemoryUserRepository implements UserRepository { ... }
// tests use InMemoryUserRepository — callers need not change
```

### React hooks as abstractions

```ts
// features/product/model/useProductSource.ts — contract
interface ProductSource {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

// ✅ Both hooks satisfy the same shape — swap without changing UI
const useApiProducts   = (): ProductSource => { /* real API */ }
const useMockProducts  = (): ProductSource => { /* mock data */ }
```

---

## I — Interface Segregation Principle

> **Clients should not depend on methods they do not use.**

Split fat interfaces and stores into focused ones.

### Narrow prop interfaces

```ts
// ❌ Bad — component receives the entire User object, uses only name
const Avatar = ({ user }: { user: User }) => <img alt={user.name} />;

// ✅ Good — declare only what is needed
interface AvatarProps {
  name: string;
  avatarUrl?: string;
}
const Avatar = ({ name, avatarUrl }: AvatarProps) => (
  <img src={avatarUrl} alt={name} />
);
// Now Avatar is reusable with any shape that has name + avatarUrl
```

### Split stores

```ts
// ❌ Bad — one god-store; every component re-renders on any change
const useAppStore = create(() => ({
  user: null,
  cart: [],
  theme: 'light',
  notifications: [],
}));

// ✅ Good — isolated stores, components subscribe to only what they need
const useUserStore         = create(() => ({ user: null }));
const useCartStore         = create(() => ({ items: [] }));
const useThemeStore        = create(() => ({ theme: 'light' }));
const useNotificationStore = create(() => ({ list: [] }));

// CartIcon subscribes only to cart — won't re-render on user change
const count = useCartStore(s => s.items.length);
```

### Split hooks

```ts
// ❌ Bad — one hook returns everything; callers import unused parts
const useUser = () => ({
  user, login, logout, updateProfile, deleteAccount, exportData,
});

// ✅ Good — focused hooks
const useCurrentUser   = () => useUserStore(s => s.user);
const useAuthActions   = () => ({ login, logout });
const useProfileEditor = () => ({ updateProfile, deleteAccount });
```

---

## D — Dependency Inversion Principle

> **High-level modules must not depend on low-level modules.  
> Both should depend on abstractions.**

### Abstract HTTP client

```ts
// shared/api/httpClient.ts — abstraction (interface)
export interface HttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, body: unknown, config?: RequestConfig): Promise<T>;
  put<T>(url: string, body: unknown, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}

// shared/api/fetchClient.ts — concrete implementation
export const fetchClient: HttpClient = {
  get:    (url) => fetch(url).then(r => r.json()),
  post:   (url, body) => fetch(url, { method: 'POST', body: JSON.stringify(body) }).then(r => r.json()),
  put:    (url, body) => fetch(url, { method: 'PUT',  body: JSON.stringify(body) }).then(r => r.json()),
  delete: (url) => fetch(url, { method: 'DELETE' }).then(r => r.json()),
};

// features/auth/api/authApi.ts — depends on abstraction, not fetch
export const createAuthApi = (http: HttpClient) => ({
  login:  (dto: LoginDto)  => http.post<AuthUser>('/auth/login', dto),
  logout: ()               => http.post<void>('/auth/logout', {}),
  refresh: ()              => http.get<AuthUser>('/auth/refresh'),
});

// Swap fetch → axios → MSW mock without touching features
const authApi = createAuthApi(fetchClient);
// const authApi = createAuthApi(axiosClient);   // same interface
// const authApi = createAuthApi(mockHttpClient); // in tests
```

### Config via injection, not hardcoded env

```ts
// ❌ Bad — feature directly reads process.env
const BASE_URL = process.env.REACT_APP_API_URL;
const login = () => fetch(`${BASE_URL}/auth/login`);

// ✅ Good — config injected from shared/config
// shared/config/env.ts
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_URL ?? '',
  wsUrl:      process.env.REACT_APP_WS_URL  ?? '',
} as const;

// features/auth/api/authApi.ts — consumes abstracted config
import { config } from 'shared/config';
const login = () => http.post(`${config.apiBaseUrl}/auth/login`, dto);
```

### DI in React via context

```tsx
// shared/api/HttpClientContext.tsx
const HttpClientContext = createContext<HttpClient>(fetchClient);
export const useHttpClient = () => useContext(HttpClientContext);
export const HttpClientProvider = ({ client, children }: {
  client: HttpClient;
  children: ReactNode;
}) => <HttpClientContext.Provider value={client}>{children}</HttpClientContext.Provider>;

// In tests — swap the real client for a mock without changing any feature
render(
  <HttpClientProvider client={mockHttpClient}>
    <LoginForm />
  </HttpClientProvider>
);
```

---

## SOLID + FSD Mapping

| Principle | FSD enforcement |
|---|---|
| **S** — Single Responsibility | Each slice = 1 scenario; each segment = 1 concern |
| **O** — Open / Closed | Widgets accept `ReactNode` slots; strategy pattern in features |
| **L** — Liskov Substitution | Shared UI props extend base interfaces; repo pattern in api/ |
| **I** — Interface Segregation | One store per entity; narrow prop interfaces; focused hooks |
| **D** — Dependency Inversion | `HttpClient` interface in shared/api; config DI; React context |

---

## Anti-Patterns Quick Reference

| Violation | Principle | Fix |
|---|---|---|
| Component fetches + renders | S | Separate api/ and ui/ segments |
| `if (type === 'X') ...` grows forever | O | Strategy/slot pattern |
| Variant removes a prop from base | L | Only extend, never narrow |
| `useAppStore` with 10+ fields | I | Split into focused stores |
| `fetch('/api/...')` hardcoded in feature | D | Inject `HttpClient` abstraction |
| `process.env` read inside feature | D | Import from `shared/config` |
| Props type is entire domain object | I | Declare only used fields |

---

## Quick Cheatsheet

```
S — one slice = one scenario | one segment = one concern
O — add slots/strategies | never edit internals for new behaviour
L — subtypes only ADD to contracts | never narrow or remove
I — narrow prop interfaces | split stores by domain | focused hooks
D — depend on interfaces not concretions | inject HTTP client + config
```

---