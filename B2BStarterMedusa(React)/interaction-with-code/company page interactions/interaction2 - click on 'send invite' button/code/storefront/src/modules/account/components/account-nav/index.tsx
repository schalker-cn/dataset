"use client"

import { B2BCustomer } from "@/types/global"

const AccountNav = ({
  customer,
  numPendingApprovals,
}: {
  customer: B2BCustomer | null
  numPendingApprovals: number
}) => {

  return (
    <div>
      <div data-testid="account-nav">
        <div className="text-lg">
          <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
            <li>
              <div className="text-neutral-400 flex items-center gap-x-2">
                Overview
              </div>
            </li>

            <li>
              <div className="text-neutral-400 flex items-center gap-x-2">
                Profile
              </div>
            </li>

            <li>
              <div className="text-neutral-950 flex items-center gap-x-2">
                Company
              </div>
            </li>

            <li>
              <div className="text-neutral-400 flex items-center gap-x-2">
                Addresses
              </div>
            </li>

            <li>
              <div className="text-neutral-400 flex items-center gap-x-2">
                Orders
              </div>
            </li>

            <li>
              <div className="text-neutral-400 flex items-center gap-x-2">
                Log out
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

}

export default AccountNav
