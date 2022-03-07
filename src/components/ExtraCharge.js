import React from 'react'

// export default function ExtraCharge({ user, items }) {
export default function ExtraCharge({ user }) {
  return (
      <>
      <h1>{user}</h1>
        <h1>Which items to take / store?</h1>
        {/* map all the items here */}
        <h2>It will cost you</h2>
        <h2>$150</h2>
        <h3>Yes</h3>
        <h3>No</h3>
      </>
    )
}
