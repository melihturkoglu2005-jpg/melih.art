import { Fragment } from "react"

// "**kalın**" yazılan kısımları <strong> yapar. Başka hiçbir biçimlendirme yoktur.
export default function Rich({ text }: { text: string }) {
  return (
    <>
      { text.split("**").map((part, index) => (
        <Fragment key={ index }>{ index % 2 === 1 ? <strong>{ part }</strong> : part }</Fragment>
      )) }
    </>
  )
}
