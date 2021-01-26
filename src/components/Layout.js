import React from 'react';
import 'scss/style.scss';

export default function Layout({ children }) {
  return (
    <>
      <header>Header</header>
      <main>{children}</main>
      <aside>Sidebar</aside>
    </>
  );
}
