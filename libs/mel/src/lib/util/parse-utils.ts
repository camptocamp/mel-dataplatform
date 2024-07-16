export function parseConfigSection(
  fullConfigObj: Record<string, Record<string, unknown>>,
  sectionName: string,
  mandatoryKeys: string[],
  optionalKeys: string[],
  outWarnings: string[],
  outErrors: string[]
): Record<string, unknown> | null {
  if (typeof fullConfigObj[sectionName] !== 'object') {
    if (mandatoryKeys.length === 0) return null
    outErrors.push(`The [${sectionName}] mandatory section is missing.`)
    return null
  }

  const sectionConf = fullConfigObj[sectionName] as Record<string, string>
  const keysCheck = checkKeys(sectionConf, mandatoryKeys, optionalKeys)

  if (keysCheck.missing.length) {
    // note: this is not thrown to allow merging several Errors down the line
    outErrors.push(
      `In the [${sectionName}] section: ${keysCheck.missing.join(', ')}`
    )
    return null
  } else if (keysCheck.unrecognized.length) {
    outWarnings.push(
      `In the [${sectionName}] section: ${keysCheck.unrecognized.join(', ')}`
    )
    keysCheck.unrecognized.forEach((key) => delete sectionConf[key])
  }

  return sectionConf
}

const checkKeys = (
  input: Record<string, string>,
  mandatory: string[],
  optional: string[]
) => {
  const keys = Object.keys(input)
  const missing = mandatory.filter((key) => keys.indexOf(key) === -1)
  const unrecognized = keys.filter(
    (key) => mandatory.indexOf(key) === -1 && optional.indexOf(key) === -1
  )
  return {
    missing,
    unrecognized,
  }
}
