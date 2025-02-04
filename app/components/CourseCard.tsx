import { Icon } from '@iconify/react/dist/iconify.js'
import Button from './Button'
import { FC } from 'react'
import { Link } from '@remix-run/react'

interface CourseCardProps {
  id:number,
    name: string,
    img : string,
    price: number,
    pertemuan : number

}
const CourseCard:FC<CourseCardProps> = ({img,name,price,pertemuan,id}) => {
  return (
    <div className="p-4 rounded-xl border space-y-1">
    <img
      src={img}
      className="bg-gray-400 w-full object-cover rounded-xl aspect-square"
      alt={name}
    />
    <div className="flex justify-between items-center">
      <small>{pertemuan} Pertemuan</small>
      <small className="flex gap-2 items-center">
        Bersertifikasi{" "}
        <Icon icon={"grommet-icons:validate"} className="text-primary" />
      </small>
    </div>
    <p className="font-semibold line-clamp-1">
      {name}
    </p>
    <p className="text-primary">Rp.{price}</p>
    <Link to={`/course/${id}`}>
    <Button width="w-full" type="button" variant="default">
      Lihat Selengkapnya
    </Button>
    </Link>
  </div>
  )
}

export default CourseCard
