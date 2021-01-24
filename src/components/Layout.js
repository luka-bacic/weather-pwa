import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <aside>Sidebar</aside>
    </div>
  );
}
