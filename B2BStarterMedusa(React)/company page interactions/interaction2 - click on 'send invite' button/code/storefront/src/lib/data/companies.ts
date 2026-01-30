"use server"

import { sdkMock } from "../mockConfig"

export const retrieveCompany = async (companyId: string) => {

  const company = await sdkMock.client.retrieveCompany(companyId)

  return company
}