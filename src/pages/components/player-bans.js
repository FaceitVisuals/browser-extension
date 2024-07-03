/** @jsx h */
import { h } from 'dom-chef'
import { format, formatDistance, parseISO } from 'date-fns'

export const PlayerBans = ({ banStart, banEnd, expired, reason }) => {
  const isActive = !expired
  const className = isActive ? 'text-success' : 'text-danger'

  // Parse banStart date string to Date object
  const startDate = parseISO(banStart)

  // Format banStart date to display day, month, year, and time
  const formattedStartDate = format(startDate, "dd MMMM yyyy 'at' HH:mm")

  // Format banEnd date to display day, month, year, and time
  const formattedEndDate = format(parseISO(banEnd), "dd MMMM yyyy 'at' HH:mm")

  // Display distance from now if ban is active
  let distanceFromNow = ''
  if (isActive) {
    distanceFromNow = formatDistance(parseISO(banEnd), new Date(), {
      addSuffix: true
    })
  }

  return (
    <span
      className={className}
      style={{
        cursor: 'help'
      }}
      title={`Ban Start: ${formattedStartDate}, Ban End: ${formattedEndDate}`}
    >
      <span style={{ float: 'center' }}>[{reason}]</span>
      {isActive ? `${distanceFromNow}: ${formattedEndDate}` : formattedEndDate}
    </span>
  )
}

export default PlayerBans
