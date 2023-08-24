import { AppContextProvider } from './AppContext'
import { FirstComponent } from './FirstComponent'

export const App = () => {

	return (
		<AppContextProvider>
			{'Hello, World!'}
			<FirstComponent/>
		</AppContextProvider>
	)
}
