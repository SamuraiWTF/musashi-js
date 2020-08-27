exports.getData = (req, res) => {
    res.json({
        theData: [{ name: 'osborn', class: 'monk'}, { name: 'dookie', class: 'barbarian'}, { name: 'fix', class: 'bard' }, { name: 'dugros', class: 'fighter'}],
        result: 'critical success'
    });
}