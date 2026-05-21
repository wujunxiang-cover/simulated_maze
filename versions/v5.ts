#include<queue>
#include<vector>
#include<ctime>
#include<cstdlib>
#include<utility>
#include <iostream>

using namespace std;

#define edge 22
class node
{
    public:
    int visited;
    int style;
    node* per_node;
    int x;
    int y;
};

node map[edge][edge];

bool create_map()
{
    for(int i=0;i<edge;i++)
    for(int j=0;j<edge;j++)
    {
        if(i==0||j==0||i==edge-1||j==edge-1)
        map[i][j].style=1;
        else
        {
            int r=rand()%4;
            if(r==0)
            map[i][j].style=1;
            else
            map[i][j].style=0;
        }
        map[i][j].visited=0;
        map[i][j].x=i;
        map[i][j].y=j;
    }
}
bool find_way_dfs()
{
    node* start=&map[1][1];
    node* end=&map[edge-2][edge-2];
    start->visited=1;
    vector<node*>stack;
    stack.push_back(start);
    while(!stack.empty())
    {
        node* current=stack.back();
        stack.pop_back();
        if(current->x==edge-2&&current->y==edge-2)
        return true;
        for(int i=-1;i<=1;i=i+2)
        {
        node* temp=&map[current->x+i][current->y];
        if(temp->visited==0&&temp->style==0)
        {
            temp->visited=1;
            temp->per_node=&map[current->x][current->y];
            stack.push_back(temp);
        }
        }
        for(int i=-1;i<=1;i=i+2)
        {
        node* temp=&map[current->x][current->y+i];
        if(temp->visited==0&&temp->style==0)
        {
            temp->visited=1;
            temp->per_node=&map[current->x][current->y];
            stack.push_back(temp);
        }
        }
    }
    return false;
}
bool find_way_bfs()
{
    node* start=&map[1][1];
    node* end=&map[edge-2][edge-2];
    start->visited=1;
    queue<node*>stack;
    stack.push(start);
    while(!stack.empty())
    {
        node*current=stack.front();
        stack.pop();
        if(current->x==edge-2&&current->y==edge-2)
        return true;
        for(int i=-1;i<=1;i=i+2)
        {
        node* temp=&map[current->x+i][current->y];
        if(temp->visited==0&&temp->style==0)
        {
            temp->visited=1;
            temp->per_node=&map[current->x][current->y];
            stack.push(temp);
        }
        }
        for(int i=-1;i<=1;i=i+2)
        {
        node* temp=&map[current->x][current->y+i];
        if(temp->visited==0&&temp->style==0)
        {
            temp->visited=1;
            temp->per_node=&map[current->x][current->y];
            stack.push(temp);
        }
        }
    }
    return false;
}
bool printf_map()
{
    if(map[edge-2][edge-2].visited==1)
    {
        map[1][1].style=2;
        node* temp=&map[edge-2][edge-2];
        while(temp!=&map[1][1])
        {
            temp->style=2;
            temp=temp->per_node;
        }
    }
    for(int i=0;i<edge;i++)
    {
    for(int j=0;j<edge;j++)
    {
        if(map[i][j].style==0)
        cout<<"  ";
        else if(map[i][j].style==1)
        cout<<"# ";
        else if(map[i][j].style==2)
        cout<<"B ";
    }
    cout<<endl;
    }  
    if(map[edge-2][edge-2].visited==0)
    {
        cout<<"未找到路径"<<endl;
    }
  
}
void clear_search()
{
    for(int i=0;i<edge;i++)
    {
        for(int j=0;j<edge;j++)
        {
            map[i][j].visited = 0;
            map[i][j].per_node = NULL;
            if(map[i][j].style == 2)
                map[i][j].style = 0;
        }
    }
}
int main()
{
    srand(time(0));
    while (true)
    {
        cout << endl;
        cout << "====== 随机迷宫寻路程序 ======" << endl;
        cout << "1. 生成地图" << endl;
        cout << "2. DFS 寻路" << endl;
        cout << "3. BFS 寻路" << endl;
        cout << "4. 打印地图" << endl;
        cout << "5. 重新生成地图" << endl;
        cout << "0. 退出程序" << endl;
        cout << "请输入选择：";

        int choice;
        cin >> choice;

        switch (choice)
        {
            case 1:
                create_map();
                map[1][1].style = 0;
                map[edge-2][edge-2].style = 0;
                cout << "地图生成完成" << endl;
                break;

            case 2:
                clear_search();
                if (find_way_dfs())
                    cout << "DFS 找到路径" << endl;
                else
                    cout << "DFS 没有找到路径" << endl;
                break;

            case 4:
                printf_map();
                break;

            case 3:
                clear_search();
                if (find_way_bfs())
                    cout << "BFS 找到路径" << endl;
                else
                    cout << "BFS 没有找到路径" << endl;
                break;
            case 5:
                create_map();
                map[1][1].style = 0;
                map[edge-2][edge-2].style = 0;
                cout << "地图已重新生成" << endl;
                break;

            case 0:
                cout << "程序退出" << endl;
                return true;

            default:
                cout << "输入无效，请重新输入" << endl;
                break;
        }
    }
    return 0;
}


