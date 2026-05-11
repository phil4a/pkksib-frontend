# PKKSib — Frontend

Фронтенд сайта «Первая Кровельная Компания» (ПКК). Проект реализован на Next.js (App Router) и
использует серверный рендеринг/стриминг для SEO и производительности, а клиентский код подключается
точечно для интерактивных частей (фильтры, модалки, карты).

[Сайт](https://pkksib.ru)

## Технологии

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Axios (HTTP-клиент)
- TanStack React Query (кэширование запросов в клиентских компонентах)
- qs (сборка query-параметров для Strapi)
- Google Maps (`@react-google-maps/api`, `@googlemaps/markerclusterer`)

## Как работает

### Рендеринг страниц

- По умолчанию используются Server Components: HTML формируется на сервере.
- Для частей, которым нужен браузерный API или состояние, применяются Client Components
  (`'use client'`).
- Для данных, которые должны участвовать в SSR/ISR, используется
  `fetch(..., { next: { revalidate } })` внутри Server Components/страниц.

### Данные и API

Проект ожидает API, совместимое со Strapi (эндпоинты с префиксом `/api`). Запросы в сервисах
строятся с помощью `qs`, чтобы удобно задавать `populate`, `filters`, `pagination`, `sort`.

## Структура проекта

Основные каталоги:

```
src/
├── app/         # Роуты (App Router)
├── components/  # Компоненты: layout/content + ui
├── services/    # Сервисы доступа к API (entity-level)
├── hooks/       # Клиентские хуки (URL-параметры, React Query и т.д.)
├── utils/       # Утилиты/бизнес-логика уровня страниц (page-level)
├── lib/         # Общие утилиты (например cn())
├── config/      # Конфиги (api paths, site config, навигация)
├── constants/   # Константы (API_URL и т.д.)
└── types/       # Типы данных и ответов API
```

## Переменные окружения

Скопируйте `.example.env` в `.env.local` и заполните значения:

```env
NEXT_PUBLIC_API_URL="http://localhost:1337/api"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID="..."
```

Важно:

- `NEXT_PUBLIC_API_URL` используется и на сервере, и в браузере, поэтому должна указывать на
  публично доступный URL API.
- Для Google Maps нужен ключ и mapId.

## Запуск

Требования:

- Node.js >= 20.9.0
- npm

Установка зависимостей:

```bash
npm ci
```

Dev-сервер:

```bash
npm run dev
```

Production сборка и запуск:

```bash
npm run build
npm run start
```

Линт:

```bash
npm run lint
```

## Примечания по страницам

- `/objects`: список объектов поддерживает server-rendering/стриминг. При смене фильтров UI
  показывает скелетоны на время ответа сервера.
- Карта объектов загружается лениво (через dynamic import) и отображает скелетон до готовности.
