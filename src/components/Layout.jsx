import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './Header';
import SideBarLeft from './SideBarLeft';
import SideBarRight from './SideBarRight';

export default function Layout() {
  return (      
    <div className="page">
      <Header title="Muncey Blog" subtitle="Philip Munce" />
      <main>
          <section className="container">
            <div className="row">
              <div className="col-2">
                <SideBarLeft />
              </div>
              <div className="col-7">
                <Outlet />
              </div>
              <div className="col-3">
                <SideBarRight />
              </div>
            </div>
          </section>
      </main>
    </div>
  );
}
