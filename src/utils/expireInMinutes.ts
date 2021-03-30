function expireInMinutes(value: Date, expire: number): string {
  const dateNow = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  }).format(value);

  const hours = value.getHours() <= 9 ? '0' + value.getHours() : value.getHours();
  const minutes = value.getMinutes() + expire;

  return dateNow + ' ' + hours + ':' + minutes;
}

export default expireInMinutes;
