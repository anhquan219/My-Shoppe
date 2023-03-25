interface Props {
  rating: number
}
export function ProductRating({ rating }: Props) {
  const renderWithStyle = (index: number) => {
    if (index <= rating) {
      return { width: '100%' }
    }

    if (index > rating && index - rating < 1) {
      return { width: `${Math.floor((index - rating) * 100)}%` }
    }

    return { width: '0%' }
  }

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='relative'>
            <div className='absolute top-0 left-0 h-full overflow-hidden' style={renderWithStyle(index + 1)}>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='h-3 w-3 fill-yellow-300 text-yellow-300'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg
              enableBackground='new 0 0 15 15'
              viewBox='0 0 15 15'
              x={0}
              y={0}
              className='h-3 w-3 fill-current text-gray-300'
            >
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
        ))}
    </div>
  )
}