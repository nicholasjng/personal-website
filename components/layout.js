import { Router, useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from './footer';
import Meta from './meta';
import Container from './container';

export default function Layout({ preview, children }) {
  const router = useRouter();
  const location = router.pathname;
  return (
    <>
      <Meta />
      <Header location={location} />
      <Container>
        <main className="min-h-screen">{children}</main>
      </Container>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  preview: false,
};

Layout.propTypes = {
  preview: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};