# marvelwiki

- Предметная область: Marvel API Encyclopedia
- Использованное API: https://gateway.marvel.com/v1/public
<h2>Основной функционал</h2>

- Регистрация пользователей
- избранные карточки: добавление, удаление и отображение
- Поиск карточек

<h2>Реализация требований</h2>

**Требования к функциональности**

1. Шапка
   - [x] Показывается всегда на всех страницах
   - [x] Показываем кнопки входа и регистрации, которые перебрасывают на страницу с нужной форма для **гостя**
   - [x] Показываем избранное, историю и кнопку выхода для **пользователя**
   - [ ] - **Кнопки не должны “мерцать”.**
2. Переиспользуемые компконенты

   - [x] [Кнопка добавить, удалить из избранного](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/heroes/Heroes.tsx)
   - [x] [Панель поиска](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/header/search/Search.tsx)
   - [x] [Карточка с единицей информации](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/heroes/Heroes.tsx)

3. Страницы
   - [x] [Главная страница](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/heroes/Heroes.tsx)
   - [x] [Страница с единицей информации](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/hero-page/Hero.tsx)
   - [x] [Страница поиска](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/header/search/Search.tsx)
   - [x] [Страница истории](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/user-page/UserContent.tsx)
   - [x] [Страница избранное](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/user-page/UserContent.tsx)
   - [x] [Страница регистрации](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/auth/SIgnup.tsx)
   - [x] [Страница входа пользователя](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/auth/Signin.tsx)

- [x] Для хранения учетных записей пользователей, их Избранного и Истории поиска, используем **LocalStorage**.

**React**

- [x] [**Пишем функциональные компоненты c хуками** в приоритете над классовыми.](https://github.com/hitoryanka/astonMarvel/tree/main/src/components)
- [ ] Есть разделение на **умные и глупые компоненты**
- [x] [Есть **рендеринг списков**](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/heroes/Heroes.tsx)
- [x] [Реализована хотя бы одна **форма**](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/auth/SIgnup.tsx)
- [ ] Есть применение **Контекст API**
- [ ] Есть применение **предохранителя**
- [x] [Есть хотя бы один **кастомный хук**](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/header/search/hooks.ts)
- [ ] Хотя бы несколько компонентов используют **PropTypes**
- [x] [Поиск не должен триггерить много запросов к серверу (**debounce**)](https://github.com/hitoryanka/astonMarvel/blob/main/src/components/header/search/hooks.ts)
- [ ] Есть применение **lazy + Suspense**

**Redux**

- [x] [Используем **Modern Redux with Redux Toolkit**](https://github.com/hitoryanka/astonMarvel/blob/main/src/store/store.ts)
- [x] [Используем **слайсы**](https://github.com/hitoryanka/astonMarvel/blob/main/src/store/features/userSlice.ts)
- [ ] Есть хотя бы одна **кастомная мидлвара**
- [x] [Используется **RTK Query**](https://github.com/hitoryanka/astonMarvel/blob/main/src/store/features/charactersApi.ts)
- [x] [Используется **Transforming Responses**](https://github.com/hitoryanka/astonMarvel/blob/main/src/store/features/charactersApi.ts)

<h3>Необязательные</h3>

- [x] [ Использование **TypeScript**](https://github.com/hitoryanka/astonMarvel/blob/main/src/types.d.ts)
- [ ] Подключен **storybook** и созданы два, три сториса с knobs, которые показывают разные состояния компонента
- [ ] Использование **Firebase** для учетных записей пользователей и их Избранного и Истории поиска.
- [ ] **Низкая связанность клиентского кода**, использующего апи кода, работающего с внешним стором.
- [x] [Настроен **CI/CD**.](https://github.com/hitoryanka/astonMarvel/blob/main/.github/workflows/integrate.yml)
- [ ] Реализована **виртуализация списков**
- [ ] Используются **мемоизированные селекторы**
- [ ] Используется **нормализованная структура стейта**
- [ ] Проведена **оптимизация приложения**
- [ ] **Feature Flags.** Реализовать фичу “Поделиться в телеграм”, закрытую под фича флагом.
- [ ] Добавить **тесты** через [jest](https://jestjs.io/ru/), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) или [Playwright](https://playwright.dev/).
- [ ] Связь UI и бизнес-логики построена не через команды, а через **события**. (https://redux.js.org/style-guide/#model-actions-as-events-not-setters, https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions). То есть, в Компонентах не должно быть приказов что-то сделать. Компоненты должны сообщать о том, что что-то случилось (произошло событие). В целом, это должно помочь сделать Project Console API.
