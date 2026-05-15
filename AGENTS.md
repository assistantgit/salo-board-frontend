\# Frontend Development Rules



\## Архітектура

\- Використовувати FSD (Feature-Sliced Design).

\- Розділяти код на:

&#x20; - `app`

&#x20; - `pages`

&#x20; - `widgets`

&#x20; - `features`

&#x20; - `entities`

&#x20; - `shared`



\---



\## Робота з API

\- Для роботи із серверним станом використовувати тільки React Query.

\- викоритовуй   `axios`

\- Заборонено робити  `axios` напряму всередині компонентів.

\- Всі API-запити виносити в окремі `api` файли.



\### Приклад структури

```txt

entities/

&#x20; user/

&#x20;   api/

&#x20;     get-user.ts

&#x20;   model/

&#x20;   ui/





