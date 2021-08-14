import { ChakraProvider } from '@chakra-ui/react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ConnectedRouter as Router } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import i18next from 'src/configs/i18n';
import ROUTES from 'src/constants/routes';
import { Home } from 'src/pages/Home';
import { Program } from 'src/pages/Program';
import { Vod } from 'src/pages/Vod';
import store from 'src/redux';
import { theme } from 'src/theme';

const App = () => {
    const history = createMemoryHistory();

    return (
        <Provider store={store}>
            <Router history={history}>
                <I18nextProvider i18n={i18next}>
                    <ChakraProvider theme={theme}>
                        <Switch>
                            <Route exact path={ROUTES.home} component={Home} />
                            <Route exact path={ROUTES.programDetails} component={Program} />
                            <Route exact path={ROUTES.vodDetails} component={Vod} />
                        </Switch>
                    </ChakraProvider>
                </I18nextProvider>
            </Router>
        </Provider>
    );
};
describe('Home page', () => {
    test('contains the Home link text in the header', () => {
        render(<App />);
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    test('contains "Scheduled On TV" message in the programs section', () => {
        render(<App />);
        expect(screen.getByText('Scheduled On TV')).toBeInTheDocument();
    });

    test('allows for navigating to program details page', async () => {
        render(<App />);

        const [programLink] = await screen.findAllByTestId('program');
        fireEvent.click(programLink);

        await waitFor(() => expect(screen.getByTestId('program-details')).toBeInTheDocument());
    });
});
