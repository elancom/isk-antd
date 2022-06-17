const TablePanel = ({children}: any) => {
  return <div style={{
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {children}
  </div>
};

export default TablePanel
