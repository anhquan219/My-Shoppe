import { useRef, useState, useId, ElementType } from 'react'
import { useFloating, shift, arrow, FloatingPortal, offset, type Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) {
  const [open, setOpen] = useState(initialOpen ?? false)
  const id = useId()
  const arrowRef = useRef<HTMLElement>(null) // Để lưu element arrow sinh ra từ useFloating
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), shift(), arrow({ element: arrowRef })],
    placement: placement
  })

  //offset : đẩy vị trí của popover
  //shift : tự căn popover khi màn hình hẹp
  //arrow : tạo mũi tên cho popover
  //placement: vị trí của popover so vs mũi tên

  const showPropover = () => {
    setOpen(true)
  }

  const hidePropover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} ref={reference} onMouseEnter={showPropover} onMouseLeave={hidePropover}>
      {children}
      {/* FloatingPortal để đưa thẻ Popoer cùng cấp body */}
      <FloatingPortal id={id}>
        {/* AnimatePresence thêm animate cho thẻ (sử dụng motion.div / motion.span /....) */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top` // vị trí của mũi tên (mong muốn animation bắt đầu từ đâu)
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {/* Thẻ chứa mũi tên lấy từ useFloating */}
              <span
                ref={arrowRef} // truyền element arrow được lưu từ ref vào để render UI arrow
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
                className='absolute z-10 -translate-y-[96%] border-[11px] border-x-transparent border-t-transparent border-b-white'
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
