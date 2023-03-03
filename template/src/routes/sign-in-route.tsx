import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Home } from '../components/home';
import {
  PublicRouteLinkProps,
  RouteLink,
} from '../components/navigation/links/route-link';
import { useModals } from '../hooks/use-modals';

export function SignInRoute() {
  const modals = useModals();
  const navigate = useNavigate();
  const onClose = useCallback(() => {
    navigate(-1);
  }, []);

  useEffect(() => {
    modals.signIn(onClose);
  }, [modals.signIn, onClose]);

  return (
    <>
      <Home />
    </>
  );
}

export const signInPath = '/sign-in';

export function SignInLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={signInPath} />;
}
