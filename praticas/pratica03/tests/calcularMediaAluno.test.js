const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('test calcularMediaAluno', () => {
    expect(calcularMediaAluno).toBeDefined();
});
test('Lança erro se a1 ou a2 não for definida', () => {
    expect(() => calcularMediaAluno()).toThrow('Notas a1 ou a2 não definidas');
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não definidas');
    expect(() => calcularMediaAluno(5)).toThrow('Notas a1 ou a2 não definidas');
});
test('Lança erro se a1 ou a2 for negativo', () => {
    expect(() => calcularMediaAluno(-1, 5)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(5, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(-3, -4)).toThrow('Notas a1 ou a2 não podem ser negativas');
});
test('Cálculo base quando a3 não é informada', () => {
    expect(calcularMediaAluno(5, 7)).toBeCloseTo(5 * 0.4 + 7 * 0.6);
    expect(calcularMediaAluno(8, 6)).toBeCloseTo(8 * 0.4 + 6 * 0.6);
});
test('Lança erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(5, 7, -1)).toThrow('Nota a3 não pode ser negativa');
});
test('Calcula média usando a1 e a3 quando a combinação é a melhor', () => {
    expect(calcularMediaAluno(8, 5, 9)).toBeCloseTo(8 * 0.4 + 9 * 0.6);
});
test('Calcula média usando a3 e a2 quando a combinação é a melhor', () => {
    expect(calcularMediaAluno(4, 7, 9)).toBeCloseTo(9 * 0.4 + 7 * 0.6);
});
