import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/index.scss';
import './partials/index.scss';
import './pages/index.scss';
import './components-v2/index.scss';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(<App />);
