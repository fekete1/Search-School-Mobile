export interface ISchoolApi	{
    nuAnoCenso: number;
    coEntidade: number;
    noEntidade: string;
    tpDependencia: number;
    rede?: string;
    localizacao: string;
    noRegiao: string;
    coUf: number;
    sgUf: string;
    coMunicipio: number;
    noMunicipio:  string;
    coCep?: number;
    dsEndereco?: string;
    nuEndereco?: number;
    dsComplemento?: string;
    noBairro?: string;
    nuDdd?: number;
    nuTelefone?: number;
    nuTelefonePublico?: number;
    nuFax?: number;
    latitude?: number;
    longitude?: number;
    isFavorite?: boolean;
}
