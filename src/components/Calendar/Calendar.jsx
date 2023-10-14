import classes from './calendar.css';
import moment from 'moment';
import 'moment/locale/ru'
moment.locale('ru')

function RowComponent(props) {
  const data = props.item
  let date = props.date
  return (
    <>
      {Array.from(Array(data.week).keys()).map(weekNumber => (
        <tr>
          {Array.from(Array(7).keys()).map(dayItem => (
            <td className={`
                ${moment(data.startOfCalendar).add('days', weekNumber * 7 + dayItem).isSame(moment(data.date)) ? 'ui-datepicker-today' : ''}
                ${moment(data.startOfCalendar).add('days', weekNumber * 7 + dayItem).isBefore(moment(data.startOfMonth)) ? 'ui-datepicker-other-month' : ''}`}>
              {moment(data.startOfCalendar).add('days', weekNumber * 7 + dayItem).format('DD')}
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export const Calendar = (props) => {
  const data = moment(props.date).format('YYYY-MM-DD')
  const startOfMonth = moment(data).startOf('month').format('YYYY-MM-DD')
  const endOfMonth = moment(data).endOf('month').format('YYYY-MM-DD')
  const startOfCalendar = (moment(startOfMonth).day() === 0 ? moment(startOfMonth).subtract('days', 6) : moment(startOfMonth).subtract('days', moment(startOfMonth).day() - 1)).format('YYYY-MM-DD')
  const difference = moment(endOfMonth).diff(moment(startOfCalendar), 'days')
  const week = Math.ceil(difference / 7)

  const item = {
    id: 1,
    date: moment(data).format('YYYY-MM-DD'),
    startOfMonth: startOfMonth,
    endOfMonth: endOfMonth,
    startOfCalendar: startOfCalendar,
    week: week
  }

  return (

    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {moment(data).format('dddd')}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">
            {moment(data).format('DD')}
          </div>
          <div className="ui-datepicker-material-month">
            {moment(data).format('MMMM')}
          </div>
          <div className="ui-datepicker-material-year">
            {moment(data).format('YYYY')}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {moment(data).format('MMMM')}
          </span>
          &nbsp;
          <span className="ui-datepicker-year">
            {moment(data).format('YYYY')}
          </span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col></col>
          <col className="ui-datepicker-week-end"></col>
          <col className="ui-datepicker-week-end"></col>
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          {<RowComponent item={item} />}
        </tbody>
      </table>

    </div>
  )
}
