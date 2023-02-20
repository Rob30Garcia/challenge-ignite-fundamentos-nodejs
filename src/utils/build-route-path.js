export function buildRoutePath(path) {
  //reconheci o path
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  //trocar o :id pela regex
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)');

  //criar um novo
  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex;
}
