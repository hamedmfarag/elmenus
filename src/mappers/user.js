export function userMapper(data) {
  return {
    id: data.id,
    name: data.username,
    role: data.role,
  };
}
