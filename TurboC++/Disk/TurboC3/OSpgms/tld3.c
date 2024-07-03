#include<stdio.h>
struct direc1
{
   char name[10];
   int size;
   struct direc2
   {
      char name[10];
      int size;
      struct file
      {
         char name[10],date[10];
      }f[5];
   }d2[5];
}d1[5];
void main()
{
	int i,j,n,k,l;
	char a[10];
	printf("enter no. of main directories:");
	scanf("%d",&n);
	for(i=1;i<=n;i++)
	{
		printf("\nenter maindirectory%d name:",i);
		scanf("%s",d1[i].name);
		printf("enter no.of subdirectories:");
		scanf("%d",&d1[i].size);
		for(j=1;j<=d1[i].size;j++)
		{
		    printf("\nenter subdirectory%d name:",j);
	            scanf("%s",d1[i].d2[j].name);
		    printf("enter size of directory%d:",j);
		    scanf("%d",&d1[i].d2[j].size);
	            printf("enter %d filenames and dates created:",d1[i].d2[j].size);
		    for(k=1;k<=d1[i].d2[j].size;k++)
		    {
			scanf("%s %s",d1[i].d2[j].f[k].name,d1[i].d2[j].f[k].date);
			for(l=1;l<=k;l++)
			{
				if(strcmp(d1[i].d2[j].f[k].name,d1[i].d2[j].f[l].name)==0)
				{
					printf("File already exists-enter other name:");
					scanf("%s %s",d1[i].d2[j].f[k].name,d1[i].d2[j].f[k].date);
					break;
				}
			}
		    }
	         }
	}
        printf("\n\ndetails are:\n");
	printf("no. of main directories=%d",n);
	for(i=1;i<=n;i++)
	{
		printf("maindirctry\tsize\tsubdirctry\tsize\tfile\tdate\n");
		for(j=1;j<=d1[i].size;j++)
		{
			for(k=1;k<=d1[i].d2[j].size;k++)	
	        	{
				printf("%s\t\t%d\t%s\t\t%d\t%s\t%s\n",a,n,d1[i].name,d1[i].size,d1[i].d2[j].name,d1[i].d2[j].size,d1[i].d2[j].f[k].name,d1[i].d2[j].f[k].date);
			}
		}
	}
}


