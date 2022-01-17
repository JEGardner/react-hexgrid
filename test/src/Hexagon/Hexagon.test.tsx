import renderer from 'react-test-renderer';

import Layout from '../../../src/Layout';
import Hexagon from '../../../src/Hexagon/Hexagon';

test('Hexagon should render correctly with default props', () => {
  const tree = renderer.create(
    <Layout
      className={'test1'}
      size={{ x: 6, y: 6 }}
      flat={false}
      spacing={1.1}
      origin={{ x: 0, y: 0 }}
    >
      <Hexagon
        q={0}
        r={0}
        s={0}
      >
        <div>child</div>
      </Hexagon>
    </Layout>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
