import React from "react";

import SideMenuRoutes from "./menu.routes";
import SocialRoutes from "./social.routes";
import CatadorMenuRoutes from "./catador.routes";
import LoadingPage from "../components/loadingPage";

import { useAuth } from "../context/auth";

export default function MainRoutes() {
  const { loading, token, user } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (token && user) {
    if (user.tipo === "comum" || user.tipo === "grande_gerador") {
      return <SideMenuRoutes />;
    } else {
      return <CatadorMenuRoutes />;
    }
  } else {
    return <SocialRoutes />;
  }
}
