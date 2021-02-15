export type TemplateAlias = 'leaders' | 'vote' | 'chart' | 'diagram' | 'activity';

/** Участник команды */
export type User = {
    id: number;
    name: string;
    avatar: string;
    valueText: string; // значение и необязательные единицы, например строки, голоса
}

/** Общие поля для всех шаблонов */
export type Template = {
    title: string;
    subtitle: string; // подзаголовок, в нашем случае название спринта
}

/** Формат данных для шаблона leaders */
export type LeadersData = Template & {
    emoji: string; // используется для акцентов в интерфейсе
    users: User[]; // упорядоченный список лидеров
}

/** Формат данных для шаблона vote */
export type VoteData = Template & {
    emoji: string; // используется для акцентов в интерфейсе
    users: User[]; // упорядоченный по голосам список участников команды
}

/** Формат данных для шаблона chart */
export type ChartData = Template & {
    values: {
        title: string;
        hint?: string; // может использоваться вместо title
        value: number;
        active?: boolean; // признак, является ли элемент текущим
    }[]; // упорядоченный массив предыдущих, текущего и следующих периодов
    users: User[]; // упорядоченный список лидеров
}

/** Формат данных для шаблона diagram */
export type DiagramData = Template & {
    totalText: string; // значение и единицы
    differenceText: string; // разница со значением предыдущего периода (спринта) и единицы
    categories: {
        title: string; // заголовок категории
        valueText: string; // значение и единицы измерения
        differenceText: string; // значение разницы с предыдущим периодом и единицы по категории
    }[];
}

/** Формат данных для шаблона activity */
export type ActivityData = Template & {
    data: {
        mon: number[]; // данные по дням недели и часам
        tue: number[]; // один день — упорядоченный массив из 24 элементов, соответствуют часам
        wed: number[];
        thu: number[];
        fri: number[];
        sat: number[];
        sun: number[];
    }
}

export type TemplateData = LeadersData | VoteData | ActivityData | DiagramData | ChartData;
export type StoryData = {
    alias: TemplateAlias;
    data: VoteData | ChartData | DiagramData | ActivityData | LeadersData;
}[];
