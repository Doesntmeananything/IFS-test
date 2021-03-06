import { ChakraProvider } from '@chakra-ui/react';
import { ConnectedRouter as Router } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { ScrollToTop } from './components/ScrollToTop';
import i18next from './configs/i18n';
import ROUTES from './constants/routes';
import { Home } from './pages/Home';
import { Program } from './pages/Program';
import { Vod } from './pages/Vod';
import store, { history } from './redux';
import { theme } from './theme';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <I18nextProvider i18n={i18next}>
                <ChakraProvider theme={theme}>
                    <ScrollToTop />
                    <Switch>
                        <Route exact path={ROUTES.home} component={Home} />
                        <Route exact path={ROUTES.programDetails} component={Program} />
                        <Route exact path={ROUTES.vodDetails} component={Vod} />
                    </Switch>
                </ChakraProvider>
            </I18nextProvider>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
