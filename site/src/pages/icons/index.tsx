import Layout from '../../components/Layout';
import IconOverview from '../../components/IconOverview';
import IconDetailOverlay from 'src/components/IconDetailOverlay';
import data from 'src/generated/data';
import categories from 'src/generated/categories';

const IconsPage = () => {
  return (
    <Layout>
      <IconDetailOverlay />
      <IconOverview {...{ data, categories }} key="icon-overview" />
    </Layout>
  );
};

export default IconsPage;
