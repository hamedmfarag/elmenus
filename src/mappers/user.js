export function userMapper(data) {
  return {
    id: data.id,
    name: data.name,
    role: data.role,
  };
}
