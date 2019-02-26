/**
 * Utilitário para trabalhar com datas
 * 
 * @author Danillo Santana
 */
const FORMATO_YYYY_MM_DD = 'YYYY-MM-DD';
const FORMATO_PADRAO_DATA = 'DD/MM/YYYY';
const FORMTAO_ISO8601 = 'YYYY-MM-DDTHH:mm:ss.SSSSZ';

 class DateTimeUtil {

    /**
     * Retorna a data formatada conforme padrão informado
     * 
     * @param {*} date 
     * @param {*} formato 
     */
    static getDataFormatada(date, formato) {
        return moment(date).format(formato);
    }
}