

import { createRoot } from 'react-dom/client';
import HomePage from '../../client/app/page';

const entryDiv = document.getElementById('root');
const root = createRoot(entryDiv);

root.render(<HomePage />)