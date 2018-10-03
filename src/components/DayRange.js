import React from 'react';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {connect} from 'react-redux'
import {changeDateRange} from '../AC'

class DayRange extends React.Component {

    constructor(props) {
        super(props);

    }


    handleDayClick = (day) => {
        const range = DateUtils.addDayToRange(day, this.props.dateRange);

        this.props.changeDateRange(range);
    }

    handleResetClick = () => {
        this.props.changeDateRange({from: null, to: null});
    }


    render() {
        const {from, to} = this.props.dateRange;
        const modifiers = {start: from, end: to};
        return (
            <div>
                <div>
                    {!from || !to ? "Select the range day" :
                        `${from.toLocaleDateString()} to ${to.toLocaleDateString()}`
                    }
                    <button onClick={this.handleResetClick}>reset</button>
                </div>
                <DayPicker
                    selectedDays={[from, {from, to}]}
                    modifiers={modifiers}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }
}

export default connect(({filters}) => ({dateRange: filters.dateRange}), {changeDateRange})(DayRange);