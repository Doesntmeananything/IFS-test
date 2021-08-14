import { ChakraProvider } from '@chakra-ui/react';
import { ConnectedRouter as Router } from 'connected-react-router';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import i18next from './configs/i18n';
import ROUTES from './constants/routes';
import Home from './pages/home';
import store, { history } from './redux';
import { theme } from './theme';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <I18nextProvider i18n={i18next}>
                <ChakraProvider theme={theme}>
                    <Switch>
                        <Route exact path={ROUTES.home} component={Home} />
                    </Switch>
                </ChakraProvider>
            </I18nextProvider>
        </Router>
    </Provider>,
    document.getElementById('app'),
);
