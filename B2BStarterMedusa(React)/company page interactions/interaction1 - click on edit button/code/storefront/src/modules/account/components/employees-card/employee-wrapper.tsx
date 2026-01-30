import { retrieveCustomer } from "@/lib/data/customer"
import { StoreOrder } from "@medusajs/types"
import Employee from "@/modules/account/components/employees-card/employee"
import { QueryCompany, QueryEmployee } from "@/types"

const EmployeeWrapper = async ({
  employee,
  company,
}: {
  employee: QueryEmployee
  company: QueryCompany
}) => {
  const customer = await retrieveCustomer()

  const orders: StoreOrder[] = []

  return (
    <Employee
      employee={employee}
      company={company}
      orders={orders}
      customer={customer}
    />
  )
}

export default EmployeeWrapper
