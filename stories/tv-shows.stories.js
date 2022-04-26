import { html } from 'lit';
import '../src/tv-shows.js';

export default {
  title: 'TvShows',
  component: 'tv-shows',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <tv-shows
      style="--tv-shows-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </tv-shows>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
