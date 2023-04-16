import Layout from '../components/Layout';

import IconOverview from '../components/IconOverview';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import data from 'src/generated/data';
import categories from 'src/generated/categories';

const HomePage = () => {
  return (
    <Layout>
      <MobileMenu />
      <Header {...{ data }} />
      <IconOverview {...{ data, categories }} />
    </Layout>
  );
};

export default HomePage;
