var should = require("should"),
  _ = require("lodash"),
  EdiFile = require("../index").EdiFile;

describe("EdiFile Luxottica", function () {
  describe("when creating without registers", function () {
    var ediFile, exception;

    before(function (done) {
      try {
        ediFile = new EdiFile();
      } catch (e) {
        exception = e;
      }

      done();
    });

    it("should throw exception", function () {
      exception.should.be.ok;
    });
  });

  describe("when creating with register with first field not starting at 4", function () {
    var ediFile, exception;

    before(function (done) {
      try {
        ediFile = new EdiFile(
          {
            "000": [
              {
                start: 43,
                end: 54,
              },
            ],
          },
          {
            registerIdLen: "3",
          }
        );
      } catch (e) {
        exception = e;
      }

      done();
    });

    it("should throw exception", function () {
      exception.should.be.ok;
    });
  });

  describe("when creating with register with field with invalid start", function () {
    var ediFile, exception;

    before(function (done) {
      try {
        ediFile = new EdiFile(
          {
            "000": [
              {
                start: 4,
                end: 39,
              },
              {
                start: 43,
                end: 54,
              },
            ],
          },
          {
            registerIdLen: "3",
          }
        );
      } catch (e) {
        exception = e;
      }

      done();
    });

    it("should throw exception", function () {
      exception.should.be.ok;
    });
  });

  describe("when creating with register without end or len", function () {
    var ediFile, exception;

    before(function (done) {
      try {
        ediFile = new EdiFile(
          {
            "000": [
              {
                start: 4,
              },
              {
                start: 7,
                end: 39,
              },
            ],
          },
          { registerIdLen: "3" }
        );
      } catch (e) {
        exception = e;
      }

      done();
    });

    it("should throw exception", function () {
      exception.should.be.ok;
    });
  });

  describe("when creating with valid registers definition ", function () {
    var ediFile, exception;

    before(function (done) {
      try {
        ediFile = new EdiFile(
          {
            "000": [
              {
                name: "remitente",
                start: 4,
                len: 35,
                type: "string",
              },
              {
                name: "destinatario",
                start: 39,
                len: 35,
                type: "string",
              },
              {
                name: "data",
                start: 74,
                len: 6,
                type: "number",
              },
              {
                name: "hora",
                start: 80,
                len: 4,
                type: "number",
              },
              {
                name: "idIntercambio",
                start: 84,
                len: 12,
                type: "string",
              },
              {
                name: "filler",
                start: 96,
                len: 145,
                type: "string",
              },
            ],
            310: [
              {
                name: "id documento",
                start: 4,
                len: 14,
                type: "string",
              },
              {
                name: "filler",
                start: 18,
                len: 223,
                type: "string",
              },
            ],
            311: [
              {
                name: "cgc",
                start: 4,
                len: 14,
                type: "number",
              },
              {
                name: "ESTADUAL EMBARCADORA",
                start: 18,
                len: 15,
                type: "string",
              },
              {
                name: "ENDERECO",
                start: 33,
                len: 40,
                type: "string",
              },
              {
                name: "CIDADE",
                start: 73,
                len: 35,
                type: "string",
              },
              {
                name: "CODIGO POSTAL",
                start: 108,
                len: 9,
                type: "string",
              },
              {
                name: "SUBENTIDAD DE PAIS",
                start: 117,
                len: 9,
                type: "string",
              },
              {
                name: "DATA EMBARQUE",
                start: 126,
                len: 8,
                type: "number",
              },
              {
                name: "RAZON SOCIAL",
                start: 134,
                len: 40,
                type: "string",
              },
              {
                name: "FILLER",
                start: 174,
                len: 67,
                type: "string",
              },
            ],
            312: [
              {
                name: "razon social",
                start: 4,
                len: 40,
                type: "string",
              },
              {
                name: "cgc",
                start: 44,
                len: 14,
                type: "number",
              },
              {
                name: "inscricao estadual",
                start: 58,
                len: 15,
                type: "string",
              },
              {
                name: "endereco",
                start: 73,
                len: 40,
                type: "string",
              },
              {
                name: "bairro",
                start: 113,
                len: 20,
                type: "string",
              },
              {
                name: "cidade",
                start: 133,
                len: 35,
                type: "string",
              },
              {
                name: "codigo postal",
                start: 168,
                len: 9,
                type: "string",
              },
              {
                name: "codigo municipio",
                start: 177,
                len: 9,
                type: "string",
              },
              {
                name: "subentidad de pais",
                start: 186,
                len: 9,
                type: "string",
              },
              {
                name: "area de frete",
                start: 195,
                len: 4,
                type: "string",
              },
              {
                name: "numero de comunica",
                start: 199,
                len: 35,
                type: "string",
              },
              {
                name: "tipo de id do destinatario",
                start: 234,
                len: 1,
                type: "string",
              },
              {
                name: "FILLER",
                start: 235,
                len: 6,
                type: "string",
              },
            ],
            313: [
              {
                name: "num romaneio",
                start: 4,
                len: 15,
                type: "string",
              },
              {
                name: "codigo da rota",
                start: 19,
                len: 7,
                type: "string",
              },
              {
                name: "meio transporte",
                start: 26,
                len: 1,
                type: "number",
              },
              {
                name: "tipo do transporte da carga",
                start: 27,
                len: 1,
                type: "number",
              },
              {
                name: "tipo de carga",
                start: 28,
                len: 1,
                type: "number",
              },
              {
                name: "condicao de frete",
                start: 29,
                len: 1,
                type: "string",
              },
              {
                name: "serie da nota fiscal",
                start: 30,
                len: 3,
                type: "string",
              },
              {
                name: "numero da nota fiscal",
                start: 33,
                len: 9,
                type: "number",
              },
              {
                name: "data de emissao",
                start: 42,
                len: 8,
                type: "number",
              },
              {
                name: "natureza tipo da mercadoria",
                start: 50,
                len: 15,
                type: "string",
              },
              {
                name: "especie de acondicionamento",
                start: 65,
                len: 15,
                type: "string",
              },
              {
                name: "qtde de volumes",
                start: 80,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor total da nota",
                start: 87,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "peso total da mercadoria a transp",
                start: 102,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "peso densidade",
                start: 109,
                len: 5,
                decimals: 2,
                type: "number",
              },
              {
                name: "incidencia de icms",
                start: 114,
                len: 1,
                type: "string",
              },
              {
                name: "seguro ja efetuado",
                start: 115,
                len: 1,
                type: "string",
              },
              {
                name: "valor do seguro",
                start: 116,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor a ser cobrado",
                start: 131,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "placa camina ou da carreta",
                start: 146,
                len: 7,
                type: "string",
              },
              {
                name: "plano de carga rapida",
                start: 153,
                len: 1,
                type: "string",
              },
              {
                name: "valor do frete peso-volume",
                start: 154,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor ad valorem",
                start: 169,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor total das taxas",
                start: 184,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor total do frete",
                start: 199,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "acao do documento",
                start: 214,
                len: 1,
                type: "string",
              },
              {
                name: "valor do icms",
                start: 215,
                len: 12,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor do icms retido",
                start: 227,
                len: 12,
                decimals: 2,
                type: "number",
              },
              {
                name: "indicacao de bonificacao",
                start: 239,
                len: 1,
                type: "string",
              },
              {
                name: "chave de acesso da nfe",
                start: 240,
                len: 44,
                type: "string",
              },
            ],
            333: [
              {
                name: "codigo da operacao",
                start: 4,
                len: 4,
                type: "number",
              },
              {
                name: "tipo de periodo de entrega",
                start: 8,
                len: 1,
                type: "number",
              },
              {
                name: "data inicial de entrega",
                start: 9,
                len: 8,
                type: "string",
              },
              {
                name: "hora inicial de entrega",
                start: 17,
                len: 4,
                type: "string",
              },
              {
                name: "data final de entrega",
                start: 21,
                len: 8,
                type: "string",
              },
              {
                name: "hora final de entrega",
                start: 29,
                len: 4,
                type: "string",
              },
              {
                name: "id do local desembarque",
                start: 33,
                len: 15,
                type: "string",
              },
              {
                name: "calculo de frete diferenciado",
                start: 48,
                len: 1,
                type: "string",
              },
              {
                name: "id tabela de preco de frete",
                start: 49,
                len: 10,
                type: "string",
              },
              {
                name: "entrega casada 1",
                start: 59,
                len: 26,
                type: "string",
              },
              {
                name: "entrega casada 2",
                start: 85,
                len: 26,
                type: "string",
              },
              {
                name: "entrega casada 3",
                start: 111,
                len: 26,
                type: "string",
              },
              {
                name: "entrega casada 4",
                start: 137,
                len: 26,
                type: "string",
              },
              {
                name: "entrega casada 5",
                start: 163,
                len: 26,
                type: "string",
              },
              {
                name: "valor de despesas adicionais",
                start: 189,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "tipo do vehiculo de transporte",
                start: 204,
                len: 5,
                type: "string",
              },
              {
                name: "FILLER",
                start: 209,
                len: 32,
                type: "string",
              },
            ],
            314: [
              {
                name: "quantidade de volumes 1",
                start: 4,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "especie de acondicionamento 1",
                start: 11,
                len: 15,
                type: "string",
              },
              {
                name: "mercadoria da nota fiscal 1",
                start: 26,
                len: 30,
                type: "string",
              },
              {
                name: "quantidade de volumes 2",
                start: 56,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "especie de acondicionamento 2",
                start: 63,
                len: 15,
                type: "string",
              },
              {
                name: "mercadoria da nota fiscal 2",
                start: 78,
                len: 30,
                type: "string",
              },
              {
                name: "quantidade de volumes 3",
                start: 108,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "especie de acondicionamento 3",
                start: 115,
                len: 15,
                type: "string",
              },
              {
                name: "mercadoria da nota fiscal 3",
                start: 130,
                len: 30,
                type: "string",
              },
              {
                name: "quantidade de volumes 4",
                start: 160,
                len: 7,
                decimals: 2,
                type: "number",
              },
              {
                name: "especie de acondicionamento 4",
                start: 167,
                len: 15,
                type: "string",
              },
              {
                name: "mercadoria da nota fiscal 4",
                start: 182,
                len: 30,
                type: "string",
              },
              {
                name: "filler",
                start: 212,
                len: 29,
                type: "string",
              },
            ],
            315: [
              {
                name: "razon social",
                start: 4,
                len: 40,
                type: "string",
              },
              {
                name: "cgc",
                start: 44,
                len: 14,
                type: "number",
              },
              {
                name: "inscricao estadual",
                start: 58,
                len: 15,
                type: "string",
              },
              {
                name: "endereco",
                start: 73,
                len: 40,
                type: "string",
              },
              {
                name: "bairro",
                start: 113,
                len: 20,
                type: "string",
              },
              {
                name: "cidade",
                start: 133,
                len: 35,
                type: "string",
              },
              {
                name: "codigo postal",
                start: 168,
                len: 9,
                type: "string",
              },
              {
                name: "codigo municipio",
                start: 177,
                len: 9,
                type: "string",
              },
              {
                name: "subentidade de pais",
                start: 186,
                len: 9,
                type: "string",
              },
              {
                name: "numero de comunicacao",
                start: 195,
                len: 35,
                type: "string",
              },
              {
                name: "filler",
                start: 230,
                len: 11,
                type: "string",
              },
            ],
            316: [
              {
                name: "razon social",
                start: 4,
                len: 40,
                type: "string",
              },
              {
                name: "cgc",
                start: 44,
                len: 14,
                type: "number",
              },
              {
                name: "inscricao estadual",
                start: 58,
                len: 15,
                type: "string",
              },
              {
                name: "endereco",
                start: 73,
                len: 40,
                type: "string",
              },
              {
                name: "bairro",
                start: 113,
                len: 20,
                type: "string",
              },
              {
                name: "cidade",
                start: 133,
                len: 35,
                type: "string",
              },
              {
                name: "codigo postal",
                start: 168,
                len: 9,
                type: "string",
              },
              {
                name: "codigo municipio",
                start: 177,
                len: 9,
                type: "string",
              },
              {
                name: "subentidade de pais",
                start: 186,
                len: 9,
                type: "string",
              },
              {
                name: "area de frete",
                start: 195,
                len: 4,
                type: "string",
              },
              {
                name: "numero de comunicacao",
                start: 199,
                len: 35,
                type: "string",
              },
              {
                name: "filler",
                start: 234,
                len: 7,
                type: "string",
              },
            ],
            317: [
              {
                name: "razon social",
                start: 4,
                len: 40,
                type: "string",
              },
              {
                name: "cgc",
                start: 44,
                len: 14,
                type: "number",
              },
              {
                name: "inscricao estadual",
                start: 58,
                len: 15,
                type: "string",
              },
              {
                name: "endereco",
                start: 73,
                len: 40,
                type: "string",
              },
              {
                name: "bairro",
                start: 113,
                len: 20,
                type: "string",
              },
              {
                name: "cidade",
                start: 133,
                len: 35,
                type: "string",
              },
              {
                name: "codigo postal",
                start: 168,
                len: 9,
                type: "string",
              },
              {
                name: "codigo municipio",
                start: 177,
                len: 9,
                type: "string",
              },
              {
                name: "subentidade de pais",
                start: 186,
                len: 9,
                type: "string",
              },
              {
                name: "numero de comunicacao",
                start: 195,
                len: 35,
                type: "string",
              },
              {
                name: "filler",
                start: 230,
                len: 11,
                type: "string",
              },
            ],
            318: [
              {
                name: "valor total das notas fiscais",
                start: 4,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "peso total das notas",
                start: 19,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "peso total densidade",
                start: 34,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "quantidade total de volumes",
                start: 49,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor total a ser cobrado",
                start: 64,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "valor total do seguro",
                start: 79,
                len: 15,
                decimals: 2,
                type: "number",
              },
              {
                name: "FILLER",
                start: 94,
                len: 147,
                type: "string",
              },
            ],
          },
          {
            dateFormat: "DDMMYYYY",
            registerIdLen: "3",
            tree: {
              nodes: {
                "000": {
                  id: "000",
                  parent: null,
                  childs: ["310"],
                  anthecesors: [null],
                  ocurrences: 1,
                },
                310: {
                  id: "310",
                  parent: "000",
                  childs: ["311", "318"],
                  anthecesors: ["000"],
                  ocurrences: 200,
                },
                311: {
                  id: "311",
                  parent: "310",
                  childs: ["312"],
                  anthecesors: ["310", "000"],
                  ocurrences: 10,
                },
                312: {
                  id: "312",
                  parent: "311",
                  childs: ["313"],
                  anthecesors: ["311", "310", "000"],
                  ocurrences: 500,
                },
                313: {
                  id: "313",
                  parent: "312",
                  childs: ["333", "314", "315", "316", "317"],
                  anthecesors: ["312", "311", "310", "000"],
                  ocurrences: 40,
                },
                333: {
                  id: "333",
                  parent: "313",
                  childs: null,
                  anthecesors: ["313", "312", "311", "310", "000"],
                  ocurrences: 1,
                },
                314: {
                  id: "314",
                  parent: "313",
                  childs: null,
                  anthecesors: ["313", "312", "311", "310", "000"],
                  ocurrences: 5,
                },
                315: {
                  id: "315",
                  parent: "313",
                  childs: null,
                  anthecesors: ["313", "312", "311", "310", "000"],
                  ocurrences: 1,
                },
                316: {
                  id: "316",
                  parent: "313",
                  childs: null,
                  anthecesors: ["313", "312", "311", "310", "000"],
                  ocurrences: 1,
                },
                317: {
                  id: "317",
                  parent: "313",
                  childs: null,
                  anthecesors: ["313", "312", "311", "310", "000"],
                  ocurrences: 1,
                },
                318: {
                  id: "318",
                  parent: "310",
                  childs: null,
                  anthecesors: ["310", "000"],
                  ocurrences: 1,
                },
              },
              root: "000",
            },
          }
        );
      } catch (e) {
        exception = e;
      }

      done();
    });

    it("should not throw exception", function () {
      (exception == null).should.be.ok;
    });

    describe("when parsing file content", function () {
      var parsedFile;

      var fileContent =
        "\
000LUXOTTICA JUNDIAI                  DIALOGO                            0902211646NOT090216460                                                                                                                                                 \n\
310NOTFI090216460                                                                                                                                                                                                                               \n\
31104692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -JUNDIAI                            13212-240SP       09022021LUXOTTICA JUNDIAI                                                                                          \n\
312JME OTICA LTDA OTICAS DINIZ             187876460003989081355476     R TAMOIO 599, S/N                       CENTRO              PATO BRANCO                        85501-067         PR           4630255011                         1      \n\
313CDJDI2021020900PRINT  0  C5  00590906809022021VENDA MERC.ADQ.               0000100000000000015693000000300000D                                      N                                                                                      35210204692027001034550050059090681713464903\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB4264AB RC001 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAOAF PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312A SAFIRA LUZES RELOJOARIA E OTICA L     926947690001750960412263     R MARECHAL FLORIANO PEIXOTO 57, S/N     CENTRO              PORTO ALEGRE                       90020-061         RS           5132110203                         1      \n\
313CDJDI2021020900RSCAP  0  C5  00590930309022021VENDA MERC.ADQ.               0000100000000000024284000000700000D                                      N                                                                                      35210204692027001034550050059093031681024115\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RAP7327AC RC009 AA            0000000               RRB3025AA A20227AB            0000000               RAL1342AA RC001               0000000               RAL1317AA RC002                                            \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312JOALHERIA E OTICA BIZ LTDA ME           86131323000130250137224      R DOUTOR LAURO MULLER 39, S/N           CENTRO              SAO FRANCISCO DO SUL               89240-000         SC           4734441191                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590904309022021VENDA MERC.ADQ.               0000100000000000015693000000300000D                                      N                                                                                      35210204692027001034550050059090431637283592\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB4264AB RC001 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312BBZ COMERCIO DE PRODUTOS OPTICOS LT DA  01153947000103253262607      AV PREF OSMAR CUNHA183 LJ 24 BL B ED CEICENTRO              FLORIANOPOLIS                      88015-100         SC           4830245501                         1      \n\
313CDJDI2021020900SCCAP  0  C5  00590915809022021REMESSA PARA DI               0000100000000000006471000000400000D                                      N                                                                                      35210204692027001034550050059091581910822119\n\
33369490                                       N                                                                                                                                                                                                \n\
3140000000               RAP8930AC RC008 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312RUDOLF WALTER BAUMGARTEN EPP            77893238000118251048144      R 11 DE NOVEMBRO  2450, S/N             CENTRO              MASSARANDUBA                       89108-000         SC           4733791681                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590930709022021VENDA MERC.ADQ.               0000100000000000010264000000200000D                                      N                                                                                      35210204692027001034550050059093071563382150\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3546AA RC003 AB                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312FERNANDA MAIA DA NOVA ME                19864789000157257437860      AV LEOBERTO LEAL 599 LOJA 03, S/N       BARREIROS           SAO JOSE                           88117-001         SC           4830352505                         1      \n\
313CDJDI2021020900SCCAP  0  C5  00590898509022021VENDA MERC.ADQ.               0000100000000000011975000000300000D                                      N                                                                                      35210204692027001034550050059089851233451870\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB4195AB RC005 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312SCHAEFER OPTICA E JOALHERIA LTDA        933364510001851100043664     AV AMERICA  325, S/N                    CENTRO              SANTA ROSA                         98900-000         RS           35122599                           1      \n\
313CDJDI2021020900RSINT  0  C5  00590924309022021VENDA MERC.ADQ.               0000100000000000009832000000400000D                                      N                                                                                      35210204692027001034550050059092431229669189\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3025AA A20386AA            0000000               RAL1342AA RC002                                                                                                                                                    \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312NOVA OPTICA EIRELI                      31674067000135258840013      R ADRIANO SCHAEFER 18 SALA 7, S/N       CENTRO              BRUSQUE                            88350-330         SC           47997366046                        1      \n\
313CDJDI2021020900SCINT  0  C5  00590915709022021VENDA MERC.ADQ.               0000100000000000014682000000300000D                                      N                                                                                      35210204692027001034550050059091571017267796\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB1971AA RC006 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312KR JOALHERIA E OTICA LTDA - ME          173559490001070963521250     AV DIARIO DE NOTICIAS 300 LJ 2102, S/N  CRISTAL             PORTO ALEGRE                       90810-080         RS           5130139787                         1      \n\
313CDJDI2021020900RSCAP  0  C5  00590905609022021VENDA MERC.ADQ.               0000100000000000003362000000300000D                                      N                                                                                      35210204692027001034550050059090561011570834\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3293AB RC003 AA            0000000               RPX0017AB RC006                                                                                                                                                    \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312RELOJOARIA ASTRO LTDA ME                95779120000145252786432      R 251 SL 01 N 100, S/N                  MEIA PRAIA          ITAPEMA                            88220-000         SC           4733685963                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590930209022021VENDA MERC.ADQ.               0000100000000000006395000000200000D                                      N                                                                                      35210204692027001034550050059093021754738875\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB4387AZ RC001 AA                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312EAX OPTICAS LTDA OTICAS CAROL           31552648000102258823402      AV XV DE NOVEMBRO 413 TERREO 02, S/N    CENTRO              JOACABA                            89600-000         SC           89600000                           1      \n\
313CDJDI2021020900SCINT  0  C5  00590915009022021VENDA MERC.ADQ.               0000100000000000009269000000400000D                                      N                                                                                      35210204692027001034550050059091501456513146\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RAM4770AC RC001 AB                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312HELIO ANIBAL GUZZATTI-EPP               82917402000110250089742      R CONSELHEIRO JOAO ZANETTE 12, S/N      CENTRO              CRICIUMA                           88801-050         SC           4834333582                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590922709022021VENDA MERC.ADQ.               0000100000000000000629000000000000D                                      N                                                                                      35210204692027001034550050059092271907790413\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RKMLE4047 RC001                                                                                                                                                                                                        \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312OTICA CALLIARI LTDA                     84584044000104250088789      AV XV DE NOVEMBRO  345, S/N             CENTRO              JOACABA                            89600-000         SC           4935223433                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590919809022021VENDA MERC.ADQ.               0000100000000000010264000000300000D                                      N                                                                                      35210204692027001034550050059091981987212159\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3025AA A20313AB                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312GERONIMO KNORST                         76580489000180250952718      R.BELO HORIZONTE 1049, S/N              CENTRO              PINHALZINHO                        89870-000         SC           4933661008                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590904809022021VENDA MERC.ADQ.               0000100000000000008403000000300000D                                      N                                                                                      35210204692027001034550050059090481529523045\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3447AA RC001 AC                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312CRISTIANO F FERNANDES & CIA LTDA        042115000001239022503526     AV MINAS GERAIS 11, S/N                 CENTRO              JAGUAPITA                          86610-000         PR           4332721296                         1      \n\
313CDJDI2021020900PRINT  0  C5  00590922009022021VENDA MERC.ADQ.               0000100000000000006395000000300000D                                      N                                                                                      35210204692027001034550050059092201872233660\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB4147AB RC003 AB                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312REL.E OT.BONETI LTDA ME                 00564865000180253094933      R.ALTAMIRO GUIMARAES 1141 SL.1, S/N     OFICINAS            TUBARAO                            88702-101         SC           4836260947                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590904709022021VENDA MERC.ADQ.               0000100000000000008403000000300000D                                      N                                                                                      35210204692027001034550050059090471298475698\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RRB3447AA RC001 AB                                                                                                                                                                                                     \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
313CDJDI2021020900SCINT  0  C5  00590948909022021VENDA MERC.ADQ.               0000100000000000037254000011300000D                                      N                                                                                      35210204692027001034550050059094891367084836\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               0RB4292N 710/1362                                                                                                                                                                                                      \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
313CDJDI2021020900SCINT  0  C5  00590978309022021VENDA PRODU��O                0000100000000000140799000013300000D                                      N                                                                                      35210204692027001034550050059097831929126768\n\
33361010                                       N                                                                                                                                                                                                \n\
3140000000               0RX7027L 5412  56             0000000               0RB3503L 041/9A66             0000000               0RB3518L 029/7163             0000000               0RB3647NL 90705151                                         \n\
3140000000               0RB4306L 710/7354                                                                                                                                                                                                      \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312CARDOSO JOALH COM DE JOIAS LTDA ME      08646042000106255337507      R CARLOS GOMES 147 SALA 02, S/N         CENTRO              RIO DO SUL                         89160-051         SC           4791535679                         1      \n\
313CDJDI2021020900SCINT  0  C5  00590950209022021VENDA PRODU��O                0000100000000000037219000011700000D                                      N                                                                                      35210204692027001034550050059095021199994080\n\
33361010                                       N                                                                                                                                                                                                \n\
3140000000               0VO5251L 2654  52             0000000               0VO5331 W656  49                                                                                                                                                   \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
313CDJDI2021020900SCINT  0  C5  00590968409022021VENDA MERC.ADQ.               0000100000000000165069000013800000D                                      N                                                                                      35210204692027001034550050059096841133631614\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               0RB3584N 90507158             0000000               0RB3025L 014/5158             0000000               0RB4301L 601S8762             0000000               0RB2188 902/3353                                           \n\
3140000000               0RB4368 65181151                                                                                                                                                                                                       \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
312KOTHE & CIA LTDA                        954273080001241080007676     R MARECHAL FLORIANO 733, S/N            CENTRO              SANTA CRUZ DO SUL                  96810-000         RS           71125030                           1      \n\
313CDJDI2021020900RSINT  0  C5  00590926709022021VENDA MERC.ADQ.               0000100000000000002881000000100000D                                      N                                                                                      35210204692027001034550050059092671110399917\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               RGL4463AA RC001                                                                                                                                                                                                        \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
313CDJDI2021020900RSINT  0  C5  00590950709022021VENDA MERC.ADQ.               0000100000000000018538000011100000D                                      N                                                                                      35210204692027001034550050059095071937327790\n\
33361020                                       N                                                                                                                                                                                                \n\
3140000000               0VO5354S W44/1156                                                                                                                                                                                                      \n\
317LUXOTTICA JUNDIAI                       04692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -CHACARA SAO PAULO   JUNDIAI                            13212-240         SP       8007039444                                    \n\
313CDJDI2021020900RSINT  0  C5  00590950809022021VENDA PRODU��O                0000100000000000013715000010700000D                                      N                                                                                      35210204692027001034550050059095081097850490"


      before(function (done) {
        parsedFile = ediFile.parseComplexFile(fileContent);
        // console.log('parseado ',parsedFile)
        done();
      });

      describe("Parsed file", function () {
        it("should have 1 line", function () {
          parsedFile.should.have.size(1);
        });

        it("first line should have the property 000", function () {
          parsedFile.should.have.property("000");
        });
      });

      describe("register 000", function () {
        it("should have 2 lines", function () {
          parsedFile["000"].should.have.size(2);
        });
        it("first line should have the register 310", function () {
          parsedFile["000"].should.have.property("310");
        });
        it("second line should have the register fields", function () {
          parsedFile["000"].should.have.property("fields", {
            remitente: "LUXOTTICA JUNDIAI",
            destinatario: "DIALOGO",
            data: 90221,
            hora: 1646,
            idIntercambio: "NOT090216460",
            filler: "",
          });
        });
      });

      describe("register 310", function () {
        it("should have one line", function () {
          parsedFile["000"]["310"].should.have.size(1);
        });
        it("first line should have the register 311", function () {
          parsedFile["000"]["310"][0].should.have.property("311");
        });
        it("second line should have the register fields", function () {
          parsedFile["000"]["310"][0].should.have.property("fields");
        });
      });
      /*
			

			describe("register 000", function () {
				it("should have 7 lines", function () {
					parsedFile.should.have.lengthOf(7);
				});
				it("seven line should have the register 310", function () {
					parsedFile["000"][6].should.have.property("310", [
						{
							"id documento": "NOTFI090216460",
							filler: "",
							311: [
								{
									cgc: 4692027001034,
									"ESTADUAL EMBARCADORA": "407292748110",
									ENDERECO: "ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -",
									CIDADE: "JUNDIAI",
									"CODIGO POSTAL": "13212-240",
									"SUBENTIDAD DE PAIS": "SP",
									"DATA EMBARQUE": 9022021,
									"RAZON SOCIAL": "LUXOTTICA JUNDIAI",
									FILLER: "",
									312: [
										{
											"razon social": "JME OTICA LTDA OTICAS DINIZ",
											cgc: 18787646000398,
											"inscricao estadual": "9081355476",
											endereco: "R TAMOIO 599, S/N",
											bairro: "CENTRO",
											cidade: "PATO BRANCO",
											"codigo postal": "85501-067",
											"codigo municipio": "",
											"subentidad de pais": "PR",
											"area de frete": "",
											"numero de comunica": "4630255011",
											"tipo de id do destinatario": "1",
											FILLER: "",
											313: [
												{
													"num romaneio": "CDJDI2021020900",
													"codigo da rota": "PRINT",
													"meio transporte": 0,
													"tipo do transporte da carga": "NaN",
													"tipo de carga": "NaN",
													"condicao de frete": "C",
													"serie da nota fiscal": "5",
													"numero da nota fiscal": 5909068,
													"data de emissao": 9022021,
													"natureza tipo da mercadoria": "VENDA MERC.ADQ.",
													"especie de acondicionamento": "",
													"qtde de volumes": 1,
													"valor total da nota": 156.93,
													"peso total da mercadoria a transp": 0.03,
													"peso densidade": 0,
													"incidencia de icms": "D",
													"seguro ja efetuado": "",
													"valor do seguro": "NaN",
													"valor a ser cobrado": "NaN",
													"placa camina ou da carreta": "",
													"plano de carga rapida": "N",
													"valor do frete peso-volume": "NaN",
													"valor ad valorem": "NaN",
													"valor total das taxas": "NaN",
													"valor total do frete": "NaN",
													"acao do documento": "",
													"valor do icms": "NaN",
													"valor do icms retido": "NaN",
													"indicacao de bonificacao": "",
													"chave de acesso da nfe":
														"35210204692027001034550050059090681713464903",
												},
											],
										},
										{
											"razon social": "A SAFIRA LUZES RELOJOARIA E OTICA L",
											cgc: 92694769000175,
											"inscricao estadual": "0960412263",
											endereco: "R MARECHAL FLORIANO PEIXOTO 57, S/N",
											bairro: "CENTRO",
											cidade: "PORTO ALEGRE",
											"codigo postal": "90020-061",
											"codigo municipio": "",
											"subentidad de pais": "RS",
											"area de frete": "",
											"numero de comunica": "5132110203",
											"tipo de id do destinatario": "",
											FILLER: "",
										},
									],
								},
							],
						},
					]);
				});
			});
		*/
    });

    describe("when parsing file content CRLF", function () {
      var parsedFile;

      var fileContent =
        "\
000LUXOTTICA JUNDIAI                  DIALOGO                            0902211646NOT090216460                                                                                                                                                 \r\n\
310NOTFI090216460                                                                                                                                                                                                                               \r\n\
31104692027001034407292748110   ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -JUNDIAI                            13212-240SP       09022021LUXOTTICA JUNDIAI                                                                                          \r\n\
312JME OTICA LTDA OTICAS DINIZ             187876460003989081355476     R TAMOIO 599, S/N                       CENTRO              PATO BRANCO                        85501-067         PR           4630255011                         1      \r\n\
313CDJDI2021020900PRINT  0  C5  00590906809022021VENDA MERC.ADQ.               0000100000000000015693000000300000D                                      N                                                                                      35210204692027001034550050059090681713464903\r\n\
312A SAFIRA LUZES RELOJOARIA E OTICA L     926947690001750960412263     R MARECHAL FLORIANO PEIXOTO 57, S/N     CENTRO              PORTO ALEGRE                       90020-061         RS           5132110203       ";

      // before(function (done) {
      // 	parsedFile = ediFile.parseComplexFile(fileContent);
      // 	done();
      // });

      // describe("Parsed file", function () {
      // 	it("should have 1 line", function () {
      // 		parsedFile.should.have.lengthOf(1);
      // 	});

      // 	it("first line should have the property 000", function () {
      // 		parsedFile.should.have.property("000", {
      // 			fields: {
      // 				remitente: "LUXOTTICA JUNDIAI",
      // 				destinatario: "DIALOGO",
      // 				data: 90221,
      // 				hora: 1646,
      // 				idIntercambio: "NOT090216460",
      // 				filler: "",
      // 			},
      // 			310: [
      // 				{
      // 					fields: {
      // 						"id documento": "NOTFI090216460",
      // 						filler: "",
      // 					},

      // 					311: [
      // 						{
      // 							fields: {
      // 								cgc: 4692027001034,
      // 								"ESTADUAL EMBARCADORA": "407292748110",
      // 								ENDERECO: "ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -",
      // 								CIDADE: "JUNDIAI",
      // 								"CODIGO POSTAL": "13212-240",
      // 								"SUBENTIDAD DE PAIS": "SP",
      // 								"DATA EMBARQUE": 9022021,
      // 								"RAZON SOCIAL": "LUXOTTICA JUNDIAI",
      // 								FILLER: "",
      // 							},

      // 							312: [
      // 								{
      // 									fields: {
      // 										"razon social": "JME OTICA LTDA OTICAS DINIZ",
      // 										cgc: 18787646000398,
      // 										"inscricao estadual": "9081355476",
      // 										endereco: "R TAMOIO 599, S/N",
      // 										bairro: "CENTRO",
      // 										cidade: "PATO BRANCO",
      // 										"codigo postal": "85501-067",
      // 										"codigo municipio": "",
      // 										"subentidad de pais": "PR",
      // 										"area de frete": "",
      // 										"numero de comunica": "4630255011",
      // 										"tipo de id do destinatario": "1",
      // 										FILLER: "",
      // 									},

      // 									313: [
      // 										{
      // 											fields: {
      // 												"num romaneio": "CDJDI2021020900",
      // 												"codigo da rota": "PRINT",
      // 												"meio transporte": 0,
      // 												"tipo do transporte da carga": "NaN",
      // 												"tipo de carga": "NaN",
      // 												"condicao de frete": "C",
      // 												"serie da nota fiscal": "5",
      // 												"numero da nota fiscal": 5909068,
      // 												"data de emissao": 9022021,
      // 												"natureza tipo da mercadoria": "VENDA MERC.ADQ.",
      // 												"especie de acondicionamento": "",
      // 												"qtde de volumes": 1,
      // 												"valor total da nota": 156.93,
      // 												"peso total da mercadoria a transp": 0.03,
      // 												"peso densidade": 0,
      // 												"incidencia de icms": "D",
      // 												"seguro ja efetuado": "",
      // 												"valor do seguro": "NaN",
      // 												"valor a ser cobrado": "NaN",
      // 												"placa camina ou da carreta": "",
      // 												"plano de carga rapida": "N",
      // 												"valor do frete peso-volume": "NaN",
      // 												"valor ad valorem": "NaN",
      // 												"valor total das taxas": "NaN",
      // 												"valor total do frete": "NaN",
      // 												"acao do documento": "",
      // 												"valor do icms": "NaN",
      // 												"valor do icms retido": "NaN",
      // 												"indicacao de bonificacao": "",
      // 												"chave de acesso da nfe":
      // 													"35210204692027001034550050059090681713464903",
      // 											},
      // 										},
      // 									],
      // 								},
      // 								{
      // 									fields: {
      // 										"razon social": "A SAFIRA LUZES RELOJOARIA E OTICA L",
      // 										cgc: 92694769000175,
      // 										"inscricao estadual": "0960412263",
      // 										endereco: "R MARECHAL FLORIANO PEIXOTO 57, S/N",
      // 										bairro: "CENTRO",
      // 										cidade: "PORTO ALEGRE",
      // 										"codigo postal": "90020-061",
      // 										"codigo municipio": "",
      // 										"subentidad de pais": "RS",
      // 										"area de frete": "",
      // 										"numero de comunica": "5132110203",
      // 										"tipo de id do destinatario": "",
      // 										FILLER: "",
      // 									},
      // 								},
      // 							],
      // 						},
      // 					],
      // 				},
      // 			],
      // 		});
      // 	});
      // });

      /*
			describe("register 000", function () {
				it("should have 7 lines", function () {
					parsedFile.should.have.lengthOf(7);
				});
				it("seven line should have the register 310", function () {
					parsedFile["000"][6].should.have.property("310", [
						{
							"id documento": "NOTFI090216460",
							filler: "",
							311: [
								{
									cgc: 4692027001034,
									"ESTADUAL EMBARCADORA": "407292748110",
									ENDERECO: "ROD.DOM GABRIEL PAULINO B.COUTO, KM 71 -",
									CIDADE: "JUNDIAI",
									"CODIGO POSTAL": "13212-240",
									"SUBENTIDAD DE PAIS": "SP",
									"DATA EMBARQUE": 9022021,
									"RAZON SOCIAL": "LUXOTTICA JUNDIAI",
									FILLER: "",
									312: [
										{
											"razon social": "JME OTICA LTDA OTICAS DINIZ",
											cgc: 18787646000398,
											"inscricao estadual": "9081355476",
											endereco: "R TAMOIO 599, S/N",
											bairro: "CENTRO",
											cidade: "PATO BRANCO",
											"codigo postal": "85501-067",
											"codigo municipio": "",
											"subentidad de pais": "PR",
											"area de frete": "",
											"numero de comunica": "4630255011",
											"tipo de id do destinatario": "1",
											FILLER: "",
											313: [
												{
													"num romaneio": "CDJDI2021020900",
													"codigo da rota": "PRINT",
													"meio transporte": 0,
													"tipo do transporte da carga": "NaN",
													"tipo de carga": "NaN",
													"condicao de frete": "C",
													"serie da nota fiscal": "5",
													"numero da nota fiscal": 5909068,
													"data de emissao": 9022021,
													"natureza tipo da mercadoria": "VENDA MERC.ADQ.",
													"especie de acondicionamento": "",
													"qtde de volumes": 1,
													"valor total da nota": 156.93,
													"peso total da mercadoria a transp": 0.03,
													"peso densidade": 0,
													"incidencia de icms": "D",
													"seguro ja efetuado": "",
													"valor do seguro": "NaN",
													"valor a ser cobrado": "NaN",
													"placa camina ou da carreta": "",
													"plano de carga rapida": "N",
													"valor do frete peso-volume": "NaN",
													"valor ad valorem": "NaN",
													"valor total das taxas": "NaN",
													"valor total do frete": "NaN",
													"acao do documento": "",
													"valor do icms": "NaN",
													"valor do icms retido": "NaN",
													"indicacao de bonificacao": "",
													"chave de acesso da nfe":
														"35210204692027001034550050059090681713464903",
												},
											],
										},
										{
											"razon social": "A SAFIRA LUZES RELOJOARIA E OTICA L",
											cgc: 92694769000175,
											"inscricao estadual": "0960412263",
											endereco: "R MARECHAL FLORIANO PEIXOTO 57, S/N",
											bairro: "CENTRO",
											cidade: "PORTO ALEGRE",
											"codigo postal": "90020-061",
											"codigo municipio": "",
											"subentidad de pais": "RS",
											"area de frete": "",
											"numero de comunica": "5132110203",
											"tipo de id do destinatario": "",
											FILLER: "",
										},
									],
								},
							],
						},
					]);
				});
			});
			*/
    });
  });
});
