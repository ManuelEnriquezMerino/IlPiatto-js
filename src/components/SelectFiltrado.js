import Select from 'react-select'; 

const SelectFiltrado = ({dato,funcionSet,opciones}) => {
    return (
        <Select 
                                    value={dato}
                                    onChange={funcionSet}
                                    isSearchable={false}
                                    options={opciones}
                                    components={{
                                        IndicatorSeparator: () => null
                                        }}
                                    styles={{
                                            menu: base => ({
                                                ...base,
                                                marginTop: 0
                                            })
                                        }}
            />
    );
}
 
export default SelectFiltrado;