import classNames from 'classnames'

export default function Skeleton({ times, onClassName }) {

  const outerClassNames = classNames(
    'relative',
    'bg-gray-200',
    'mb-3',
    'rounded',
    'overflow-hidden',
    onClassName
  )
  const innerClassNames = classNames(
    'absolute',
    'inset-0',
    'animate-shimmer',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-gray-100',
    'to-gray-200',
  )

  const boxes = Array(times).fill(0).map((item, index) => {
    return (
      <div key={index} className={outerClassNames}>
        <div className={innerClassNames}></div>
      </div>
    )
  })

  return boxes
}
