export default function CostCodeSelector({currentDiv, codeId, setCodeId}) {
  const renderCodes  = currentDiv ? currentDiv.cost_codes?.map(code => <option key={code.id} value={code.id}>{code.description}</option> ) : <option>No Current Divisions</option>;

  const handleSelect = (e) => {
    setCodeId(e.target.value)
  };

  return (
    <div>
      <select onChange={handleSelect} value={codeId} style={{width: '300px'}}>
        <option value={undefined}>Select Cost Code</option>
        {renderCodes}
      </select> 
    </div>
  )
}
