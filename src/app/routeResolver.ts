export const root = {
  home: () => '/',
}

export const contact = {
  create: () => '/contacts/new',
  update: (id: string) => `contacts/${id}`,
}

export const allowedPaths: readonly string[] = [
  '/',
  '/contacts/new',
  '/contacts/:id',
];
