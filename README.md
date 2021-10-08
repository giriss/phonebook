## Some basic info:
- I added only 1 test 😔 due to time constraints. (`src/components/Contact/ContactsList.test.tsx`).
- I used redux's `connect` instead of `useDispatch` / `useSelector` since I do not like this kind of heavy coupling between react and the state management solution.
- I have also implemented routing for creation and edition.
- I save the some partial info from the state to the localStorage just for convience purposes (You don't need to re-create contacts on every reload 😋).
- You can also access the app **[HERE](https://phonebook-brown.vercel.app/)**!!!

## How to setup
Option 1:
- Clone it!
- Ensure you have yarn!
  - Or install yarn using `npm i -g yarn`.
- `cd` into the directory & `yarn` to install everything.
- `yarn start` to launch the dev server.
- `yarn test` to run the tests 😁

Or simply [phonebook-brown.vercel.app](https://phonebook-brown.vercel.app/) 😍
