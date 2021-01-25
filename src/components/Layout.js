import React from 'react';

export default function Layout({ children }) {
  return (
    <>
      <header>Header</header>
      <main>{children}</main>
      <aside>Sidebar</aside>
    </>
  );
}
