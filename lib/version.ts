
const VERSIONS : number[] = [
  1.0
];

export const LATEST : number = 1.0;
export const STABLE : number = 1.0;

const nearestMatch = (haystack : number[], needle : number) => {
  if(!haystack) { return; }
  return haystack.reduce((prev, current) => Math.abs(current - needle) < Math.abs(prev - needle) ? current : prev);
}

const apiVersion = (version : string) : number => {
  const parsedVersion = parseFloat(version);
  if(parsedVersion !== NaN) {
    const nearest = nearestMatch(VERSIONS, parsedVersion);
    if(nearest) { return nearest; }
  }

  return STABLE;
};

export const versionDefinitions = () => {
  let versions : { [key: string]: any } = [];

  return {
    register: (version: number, definition: any) => {
      versions[version] = definition;
    },
    get: (version: string) : any => {
      const nearestVersion = apiVersion(version);
      if(nearestVersion) {
        return versions[nearestVersion];
      }
      return versions[STABLE];
    }
  }
}

export const versionFromContext = (context : any, definitions: any) : any => {
  if(context && context.params && context.params.version && context.params.version.length > 0) {
    const versionParam : string = context.params.version;
    let version : string | null = null;
    if(versionParam.toUpperCase() === '$LATEST') {
      version = LATEST.toString();
    } else if(versionParam.toUpperCase() === '$STABLE') {
      version = STABLE.toString();
    } else {
      version = versionParam;
    }
    if(version) {
      const api = definitions.get(version);
      return api;
    }
  }

  return null;
}