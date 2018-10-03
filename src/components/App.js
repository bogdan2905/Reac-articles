import React from 'react'
import ArticleList from './ArticleList'
import DayRange from './DayRange'
import Counter from './Counter'
import store from '../store'
import {Provider} from 'react-redux'
import Filter from './Filters'
import {articles} from '../fixtures'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Filter/>
                    <Counter/>
                    <DayRange/>
                    <ArticleList/>
                </div>
            </Provider>
        )
    }

}

export default App;