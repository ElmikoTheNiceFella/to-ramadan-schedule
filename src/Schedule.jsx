import React from 'react'

const Schedule = ({data}) => {
  return (
    <div className="schedule">
      {Object.keys(data).map(day => (
        <div className="day-container">
          {/* Days */}
          <h2 className="day">{day}</h2>
          {/* Courses */}
          <div className="day-courses">
            {data[day].map(course => (
              <div className="course">
                {/* Course Name */}
                <h3 className="course-name">{course[0]}</h3>
                {/* Course Timing */}
                <p className="course-timing">{course[1]}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Schedule